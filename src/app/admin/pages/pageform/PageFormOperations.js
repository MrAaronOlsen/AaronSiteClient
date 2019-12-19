import Logger from 'logger';

import { GET } from 'http/get.js';
import { PUT } from 'http/put.js';
import { POST } from 'http/post.js';
import { API_V1 } from 'http/url.js';

export const fetchPages = function(callback) {

  GET(API_V1 + 'pages?fields=id,header,sequence&sort=sequence', (payload) => {
    if (payload.hasErrors()) {
      Logger.error("Fetch failed for all Pages. Cause: " + payload.getErrors())
    } else {
      callback(payload.getData())
    }
  })
}

export const fetchPage = function(id, callback) {
  if (!id) {
    return;
  }

  GET(API_V1 + 'pages/' + id, (payload) => {
    if (payload.hasErrors()) {
      Logger.error("Fetch failed for Page. Cause: " + JSON.stringify(payload))
    } else {
      const page = payload.getFirst();
      Logger.info("Fetched Page. Id: " + page.id);

      callback(page)
    }
  })
}

export const insertPage = function(page, callback) {
  if (!page) {
    return;
  }

  POST(API_V1 + 'pages/', page, (payload) => {
    if (payload.hasErrors()) {
      Logger.error("Insert failed for Page. Cause: " + JSON.stringify(payload));
    } else {
      const id = payload.getFirst().id;
      Logger.info("Inserted Page. Id: " + id);

      callback(id)
    }
  })
}

export const savePage = function(page, callback) {
  if (!page) {
    return;
  }

  PUT(API_V1 + 'pages/' + page.id, page, (payload) => {
    if (payload.hasErrors()) {
      Logger.error("Save failed for Page. ID: " + page.id + ". Cause: " + JSON.stringify(payload));
    } else {
      const saved = payload.getFirst();
      Logger.info("Saved Page. Id: " + saved.id);

      callback(saved)
    }
  })
}

export const deletePage = function(id, callback) {
  if (!id) {
    return;
  }

  DELETE(API_V1 + 'pages/' + id, {}, (payload) => {
    if (payload.hasErrors()) {
      Logger.error("Delete failed for Page. ID: " + id + ". Cause: " + payload.getErrors());
    } else {
      const deleted = payload.getFirst().id;
      Logger.info("Deleted page. ID: " + deleted);

      callback(deleted)
    }
  })
}