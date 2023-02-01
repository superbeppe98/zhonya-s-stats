FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

#If you are building your code for production
RUN npm ci --only=production

#Bundle app source
COPY . .

RUN apk add --no-cache \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    nodejs \
    yarn

RUN echo "deb http://dl.google.com/linux/chrome/deb/ stable main" | tee -a /etc/apk/repositories && \
    apk update && \
    apk add --no-cache chromium

#Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

CMD [ "npm", "start" ]
