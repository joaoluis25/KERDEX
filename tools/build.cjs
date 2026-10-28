const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),dir=path.join(root,'dist');
fs.rmSync(dir,{recursive:true,force:true});fs.mkdirSync(dir,{recursive:true});
for(const file of ['index.html','styles.css','site.webmanifest'])fs.copyFileSync(path.join(root,file),path.join(dir,file));
for(const folder of ['src','assets'])fs.cpSync(path.join(root,folder),path.join(dir,folder),{recursive:true});
console.log('KERDEX static distribution generated in dist/. Live news requires local server or separately deployed API.');
