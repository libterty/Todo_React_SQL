FROM node
WORKDIR todo_sql
RUN npm install -g nodemon
COPY package.json .
RUN npm install
COPY . .
EXPOSE 80
CMD ["node", "index.js"]