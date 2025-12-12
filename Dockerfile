# ---------------------------
# Stage 1: build the Vite app
# ---------------------------
FROM node:20-alpine AS build

WORKDIR /usr/src/app

# Ensure npm uses legacy peer deps to avoid ERESOLVE failures in CI
ENV NPM_CONFIG_LEGACY_PEER_DEPS=true
# Optional: pin npm if you want a different npm version
# RUN npm install -g npm@11.7.0

# Copy package files first to leverage build cache
COPY package*.json ./

# Install dependencies (including devDependencies needed for `npm run build`)
# Use npm ci for reproducible installs if you have package-lock.json
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Copy source and build
COPY . .
RUN npm run build

# ---------------------------
# Stage 2: serve with nginx
# ---------------------------
FROM nginx:alpine

# If you want nginx to listen on a non-standard port (e.g. 7877),
# make sure your nginx.conf exposes that port (example below).
# Copy build output from the build stage
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Copy custom nginx config (ensure it listens on the port you expose)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port — match this with the port in nginx.conf
EXPOSE 7877

CMD ["nginx", "-g", "daemon off;"]
