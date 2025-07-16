FROM node:22
# Disable TLS certificate verification for development purposes
# Note: This is just for the purposes of this test, would not be used in production
ENV NODE_TLS_REJECT_UNAUTHORIZED=0 
# Set Node.js options to suppress warnings
# Again just for this test, not for production
ENV NODE_OPTIONS=--no-warnings
WORKDIR /app
COPY package.json ./
COPY tsconfig.json ./
RUN npm install
COPY . .
RUN npx tsc
CMD ["npm", "start"]
