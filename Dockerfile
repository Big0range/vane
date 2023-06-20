FROM node:18.16.0
WORKDIR /app
COPY . .
# RUN npm install pm2 -g
# RUN yarn
# RUN yarn build
EXPOSE 9999
CMD [ "sh", "run.sh" ]