# RUN ls scripts && ls scripts/package

# Install all node dependencies
FROM node:16-alpine
WORKDIR /usr/src/app

COPY ./package.json ./
RUN npm install serverless --location=global
RUN npm install serverless-bundle --location=global
RUN npm install --omit=dev

ARG stage
ENV stage=${stage}

COPY ./ ./
RUN mkdir layer
RUN mkdir layer/nodejs
RUN cp -R node_modules/* layer/nodejs/

CMD sls deploy --stage $stage
