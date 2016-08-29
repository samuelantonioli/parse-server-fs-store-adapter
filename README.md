# parse-server-fs-store-adapter

Use your file system for parse-server storage. Based on parse-server-fs-adapter

After parse-server-fs-adapter didn't work for me i.e. getting errors like this:

https://github.com/parse-server-modules/parse-server-fs-adapter/issues/3

I read the source code of the Grid Store Adapter as an inspiration
and used the functions of parse-server-fs-adapter.  

Please read the source, it's short and it works.

- - -

Please create the `files` directory or the specified files directory **before** using it,  
it doesn't create it automatically. Use e.g. `mkdir -p recursive/path/created/files`.  
This saves probably error-prone code here.

- - -

**Usage**

As an instance:

    var FSStoreAdapter = require('parse-server-fs-store-adapter').FSStoreAdapter;
    var fs_store_adapter = new FSStoreAdapter({
        // caution: create this directory before you use it
        filesSubDirectory: "other_files_directory" // optional, default: "files"
    });

    var api = new ParseServer({
        // ...
        filesAdapter: fs_store_adapter
    });

As a config option:

    var api = new ParseServer({
        // ...
        filesAdapter: {
            module: 'parse-server-fs-store-adapter',
            options: {
                // optional, default: 'files'
                // caution: create this directory before you use it
                filesSubDirectory: 'other_files_directory'
            }
        }
    });
