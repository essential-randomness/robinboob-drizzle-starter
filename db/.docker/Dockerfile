FROM node:20-alpine AS base

WORKDIR /src

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install && yarn cache clean --force

COPY . .