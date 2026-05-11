# Frontend Deployment Guide for Rahti (OpenShift)

## Overview

This guide explains how to deploy the refactored frontend to Rahti with proper environment configuration for the backend API.

## Key Changes Made

1. **Environment Configuration Files**:
   - `.env.example` - Template for configuration
   - `.env.development` - Local development config (localhost)
   - `.env.production` - Production config (Rahti backend URL)

2. **API Configuration Module** (`src/config/api.ts`):
   - Centralized API configuration
   - Support for environment-specific settings
   - Built-in timeout and error handling
   - Debug logging capability

3. **Updated API Calls** (`src/api/items.ts`):
   - Uses the configuration module
   - Cleaner and more maintainable code

4. **Simplified Dockerfile**:
   - Builds with `.env.production` settings
   - No longer uses build-time arguments
   - More portable and secure

## How Environment Variables Work

### Local Development

When you run `npm run dev`:

- Vite automatically loads `.env.development`
- API calls go to `http://localhost:8080`
- Debug logging is enabled

```bash
npm run dev
```

### Production Build Locally

To test production build locally:

```bash
npm run build
npm run preview
```

This will:

- Load `.env.production` settings
- Build for production
- API calls would go to the Rahti backend URL

## Deployment to Rahti

### Prerequisites

- Rahti account with OpenShift CLI or web console access
- Docker registry credentials (if using external registry)
- Backend API deployed and accessible

### Step 1: Update Configuration

Edit `.env.production` with your actual backend URL:

```bash
VITE_API_URL=https://your-backend-domain.rahtiapp.fi
VITE_API_DEBUG=false
```

### Step 2: Build and Push Docker Image

#### Option A: Using Rahti Web Console

1. Go to your Rahti project
2. Create a new app → Docker → specify Git repository
3. Ensure the Dockerfile is in root directory
4. Let Rahti build and deploy automatically

#### Option B: Using OpenShift CLI

```bash
# Login to Rahti
oc login https://rahti.csc.fi --token=YOUR_TOKEN

# Create project (if needed)
oc new-project tiimi3-frontend

# Create image stream
oc new-build --binary --name=tiimi3-frontend

# Build image
oc start-build tiimi3-frontend --from-dir=. --follow

# Deploy
oc new-app tiimi3-frontend
oc expose svc/tiimi3-frontend
```

#### Option C: Using Docker Build & Push

```bash
# Build image
docker build -t your-registry/tiimi3-frontend:latest .

# Push to registry
docker push your-registry/tiimi3-frontend:latest

# Deploy via Rahti web console using the pushed image
```

### Step 3: Verify Deployment

1. **Get the frontend URL** from Rahti web console (Routes section)
2. **Test the application**:
   - Open the frontend URL in browser
   - Check browser console for API errors (F12 → Console)
   - Verify API calls go to the correct backend

3. **Debug if needed**:
   - Check pod logs: `oc logs -f pod/tiimi3-frontend-xxx`
   - Verify backend accessibility from frontend pod
   - Check CORS configuration on backend

## Troubleshooting CORS Errors

### Error: "Cross Origin Request Blocked"

**Root Causes**:

1. Backend CORS not configured for frontend URL
2. API URL still pointing to localhost
3. Frontend and backend on different domains

**Solutions**:

**Backend Configuration** (Spring Boot example):

```java
@Configuration
@EnableWebMvc
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins(
                        "http://localhost:3000",  // local dev
                        "http://localhost:8080",
                        "https://tiimi3-frontend.rahtiapp.fi"  // production
                    )
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(true)
                    .maxAge(3600);
            }
        };
    }
}
```

**Verify Configuration**:

1. **Check frontend is using correct API URL**:

   ```bash
   # Open browser DevTools → Application → Local Storage
   # Or check network tab to see actual API request URLs
   ```

2. **Verify backend accepts frontend origin**:

   ```bash
   curl -H "Origin: https://tiimi3-frontend.rahtiapp.fi" \
        -H "Access-Control-Request-Method: GET" \
        -X OPTIONS https://your-backend.rahtiapp.fi/api/tuotteet -v
   ```

3. **Test API endpoint directly**:
   ```bash
   curl https://your-backend.rahtiapp.fi/api/tuotteet
   ```

## Environment Variables Reference

### Frontend Environment Variables

| Variable           | Required | Default                 | Description                              |
| ------------------ | -------- | ----------------------- | ---------------------------------------- |
| `VITE_API_URL`     | No       | `http://localhost:8080` | Backend API base URL (no trailing slash) |
| `VITE_API_TIMEOUT` | No       | `10000`                 | Request timeout in milliseconds          |
| `VITE_API_DEBUG`   | No       | `false`                 | Enable API debug logging                 |

### How to Set in Rahti

1. **Via OpenShift CLI**:

   ```bash
   oc set env deployment/tiimi3-frontend VITE_API_URL="https://backend.rahtiapp.fi"
   ```

2. **Via Web Console**:
   - Deployments → Select your deployment
   - Environment → Add Variable
   - Redeploy

## Security Best Practices

✅ **Good Practices**:

- API URL is in `.env` files (environment-specific)
- No hardcoded URLs in source code
- Sensitive config not committed to git (use `.gitignore`)
- CORS properly configured on backend
- Using HTTPS for all API calls

❌ **Avoid**:

- Hardcoding API URLs in source code
- Committing `.env.production` with real credentials
- Opening CORS to all origins (`allowedOrigins("*")`)
- Storing tokens in localStorage (use httpOnly cookies if possible)

## Adding API Keys/Tokens (If Needed)

For secure token handling:

1. **Environment Variable** (for non-sensitive config):

   ```bash
   VITE_API_TOKEN=xyz  # Only for public/non-sensitive tokens
   ```

2. **Secure Storage** (for sensitive tokens):

   ```typescript
   // Store in httpOnly cookie via backend
   // Frontend accesses via headers automatically
   ```

3. **Update Config**:
   ```typescript
   // src/config/api.ts
   export function getAuthHeaders(): HeadersInit {
     const token = localStorage.getItem("auth_token"); // if using localStorage
     return token ? { Authorization: `Bearer ${token}` } : {};
   }
   ```

## Next Steps

1. Update `.env.production` with your actual backend URL
2. Commit environment files (except `.env` with real secrets)
3. Push to your Git repository
4. Deploy to Rahti
5. Test thoroughly in production environment
6. Monitor logs for any API errors

## Useful Commands

```bash
# Local development
npm run dev

# Build for production locally
npm run build

# Preview production build
npm run preview

# Check for lint errors
npm lint

# Rahti: Check pod logs
oc logs -f deployment/tiimi3-frontend

# Rahti: Port forward for local testing
oc port-forward svc/tiimi3-frontend 8080:8080
```

## Support

For issues:

1. Check browser console (F12)
2. Check pod logs in Rahti web console
3. Verify `.env.production` has correct backend URL
4. Ensure backend has CORS configured for your frontend URL
5. Test backend API directly: `curl https://your-backend.rahtiapp.fi/api/tuotteet`
