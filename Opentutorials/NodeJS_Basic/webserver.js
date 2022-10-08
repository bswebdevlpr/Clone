const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const CREATE = 0;
const UPDATE = 1;

const MENU_PATH = './descriptions';


function show_posting_func(opt, title, description){
  switch (opt){
    case CREATE:
      let createReturnArr = [];
      const createTitle = 'Posting';
      const createDescription = `
        <form id="process_create" method="post" action="/process_create">
          <p><input type="text" name="title" placeholder="title"/></p>
          <p><textarea name="description" placeholder="..." cols="30" rows="10"></textarea></p>
          <p><button>Submit</button></p>
        </form>
      `;
      createReturnArr.push(createTitle);
      createReturnArr.push(createDescription);
      return createReturnArr;

    case UPDATE:
      let updateReturnArr = [];

      const updateTitle = `Update - ${title}`;
      const updateDescription = `
        <form id="process_update" method="post" action="/process_update?parent=${title}">
          <p><input type="hidden" name="id" value="${title}"/></p>  
          <p><input type="text" name="title" value="${title}"/></p>
          <p><textarea name="description" cols="30" rows="10">${description}</textarea></p>
          <p><button>Submit</button></p>
        </form>
      `;
      updateReturnArr.push(updateTitle);
      updateReturnArr.push(updateDescription);
      return updateReturnArr;

  }
}


function templateHome(queryId, fileListStr, description, postingFuncList){
  const title = queryId;
  return `
          <!doctype html>
          <html>
            <head>
              <title>WEB1 - ${title}</title>
              <meta charset="utf-8">
            </head>

            <body>
              <div id="menuList">
                <h1><a href="/">WEB</a></h1>
                <ol>${fileListStr}</ol>
                <p><a href="/?id=create">Create</a></p>
                  ${postingFuncList}
              </div>
              <div id="menu"><h2>
                ${title}
              </h2></div>
              <div id="contents">
                ${description}
              </div>
            </body>
          </html>
          `;
}


const app = http.createServer(function(request,response){
  const urlData = url.parse(request.url, true);
  const queryData = urlData.query;
  let queryId = queryData.id;

  console.log(urlData);

  // Home, Menu, Create
  if (urlData.pathname == '/') {
    // 일단 파일 search
    fs.readFile(`descriptions/${queryId}`, 'utf8', function(err, description){
      
      // fileListStr을 외부에서 정의한 후 readdir 콜해서 내용만 따오려 했으나 eventListener 개념처럼 내부함수가 더 늦게 실행됨. 때문에 내부에서 실행하는 구조로 바꿈.
      fs.readdir(MENU_PATH, (err, fileList) => {
        let fileListStr = ``;
        let postingFuncStr = ``;

        for (i=0; i<fileList.length; i++){
          fileListStr = fileListStr +  `<li>`;
          fileListStr = fileListStr + `<a href="/?id=${fileList[i]}">${fileList[i]}</a>`;
          fileListStr = fileListStr + `</li>`;
        }

        // MENU: Couldn't search file
        if (queryId === undefined){
          queryId = 'HOME';
          description = "Hello World!";
        }
        
        // MENU: Create
        else if (queryId === 'create'){
          const showCreateArr = show_posting_func(CREATE);
          queryId = showCreateArr[0];
          description = showCreateArr[1];
        }
        
        // MENU: A file exists
        else {
          const queryFunc = queryData.func;

          // Func: Update
          if(queryFunc === 'update'){
            const showUpdateArr = show_posting_func(UPDATE, queryId, description);

            queryId = showUpdateArr[0];
            description = showUpdateArr[1];
          }
          // else{
          //   // undefined
          // }

          // Add 'update' and 'delete' to description
          postingFuncStr = `
            <script>
              const UPDATE = 0;
              const DELETE = 1;

              function btn(opt, contents){
                switch (opt){
                  case UPDATE:
                    window.location = '/?id=${queryId}&func=update';
                    break;

                  case DELETE:
                    const isDelete = confirm(contents);

                    if(isDelete === true){
                      window.location = '/process_delete?id=${queryId}';
                    } else{
                      window.location = '/?id=${queryId}';
                    }
                    break;
                }
              }
            </script>
            <span>
              <button onclick="javascript:btn(UPDATE)">Update</button>
              <button onclick="javascript:btn(DELETE, 'Do you really want to delete ${queryId}?')">Delete</button>
            </span>
            `;
        }

        let template = templateHome(queryId, fileListStr, description, postingFuncStr);
        response.writeHead(200);
        response.end(template);
      });
    });
  /*
    Processes
    - Create
    - Update
    - Delete 
  */
  } else if (urlData.pathname === '/process_create'){
      let body = '';

      request.on('data', (data) => {
        body = body + data;
      });

      request.on('end', () => {
        let post = new URLSearchParams(body);
        let post_title = post.get('title');
        let post_description = post.get('description');

        fs.writeFile(MENU_PATH + '/' + post_title, post_description, 'utf8', (err) => {
          response.writeHead(302, 
            {Location: `/?id=${post_title}`});
          response.end();
        });
      });
  } else if(urlData.pathname === '/process_update'){ 
      let body = '';

      request.on('data', (data) => {
        body = body + data;
      });

      request.on('end', () => {
        let post = new URLSearchParams(body);
        let post_id = post.get('id');
        let post_new_title = post.get('title');
        let post_new_description = post.get('description');
        
        if (post_id === post_new_title){
          fs.writeFile(MENU_PATH + '/' + post_id, post_new_description, 'utf8', (err) => {
            response.writeHead(302, 
              {Location: `/?id=${post_id}`});
            response.end();
          });
        } else{
          fs.writeFile(MENU_PATH + '/' + post_new_title, post_new_description, 'utf8', (err) => {
            fs.unlink(MENU_PATH + '/' + post_id, (err) => {
              if (err) throw err;
              response.writeHead(302, 
                {Location: `/?id=${post_new_title}`});
              response.end();
            });
          });
        }
      });
  } else if (urlData.pathname === '/process_delete'){
    fs.unlink(MENU_PATH + '/' + queryId, (err) => {
      if (err) throw err;
      response.write(`
        <script>
          window.location = '/';
          alert("${queryId} is successfully deleted!");
        </script>
      `);
      response.end();
    });
  } else{
    response.writeHead(404);
    response.end('Not Found');
    return;
  }

});
app.listen(3000);
 