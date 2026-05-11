# ============================
# Stage 1: Build
# ============================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first (for layer caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source
COPY . .

# Build arg for backend URL (passed at docker build time)
ARG VITE_API_URL=http://localhost:8080
ENV VITE_API_URL=$VITE_API_URL

# Build the app
RUN npm run build

# ============================
# Stage 2: Runtime (nginx)
# ============================
FROM nginx:alpine

# OpenShift runs as random non-root UID — fix permissions
RUN chmod -R g=u /var/cache/nginx /var/run /var/log/nginx && \
    chown -R nginx:0 /var/cache/nginx /var/run /var/log/nginx && \
    sed -i 's/listen\s*80;/listen 8080;/g' /etc/nginx/conf.d/default.conf && \
    sed -i 's/listen\s*\[::\]:80;/listen [::]:8080;/g' /etc/nginx/conf.d/default.conf

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built static files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# OpenShift requires non-root
USER nginx

# Rahti expects port 8080 (not 80)
EXPOSE 8080
