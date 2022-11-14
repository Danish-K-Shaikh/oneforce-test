# RUN ls scripts && ls scripts/package

# Install all node dependencies
FROM node:16-alpine
WORKDIR /usr/src/app

COPY ./package.json ./
RUN npm install serverless -g
RUN npm install --only=production

ARG stage
ENV stage=${stage}

COPY ./ ./
RUN mkdir layer/nodejs && cp -R node_modules/* layer/nodejs/

RUN rm -rf node_modules

CMD sls deploy --stage $stage
