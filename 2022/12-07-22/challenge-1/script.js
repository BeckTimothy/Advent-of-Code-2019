const fs = require('fs');
let input = fs.readFileSync('./input.txt');
input = input.toString().trim().split('\r\n');

class File {
    constructor(directories,fileSize) {
        this.directories = directories;
        this.fileSize = fileSize;
    }
}
let pwd = [];
let files = [];
let directories = new Map().set('/',0);

//loop through each line
input.forEach(line => {

    //track the pwd in the pwd array
    if(line.startsWith('$ cd')){
        let dir = line.substring(5);
        dir === '..' ? pwd.pop() : pwd.push(dir);
    }

    //create file objects in the files array
    //and directory key/value pairs in directories array
    //the key is a concatination of the directory path
    if(line.charAt(0) !== '$'){
        let data = line.split(' ');
        let dirTag = pwd.join('\\');
        directories.set(dirTag,0)
        if(data[0] !== 'dir'){
            files.push( new File( Array().concat(pwd), Number(data[0])) );
        }
    }
})

//add the filesize to the directory array, for every file
files.forEach(file => {
    for(let i=file.directories.length-1;i>=0;i--){
        let arr = file.directories.slice(0,i+1);
        let tag = arr.join('\\');
        directories.set( tag,directories.get(tag) + file.fileSize )
    }
})

//add all the directory sizes under 100k together
let val = 0;
directories.forEach(dir => {
    if(dir <= 100000) {
        val += dir;
    }
})

console.log(val);