# HTML Parser
This is a simple HTML Parser that I built during my time at MMA Vietnam. Made simply using nodejs and cheerio.

## Description
I started building this tool when I was given a very boring task of copying and pasting data from their MMA Smarties Shortlist page. As I didn't have access to the backend, I built this parser to read the 2 tables in the Shortlist Page and output all of the data in CSV.

## How to use
- Create a folder named ```samples``` and a folder called ```folder``` in the root directory of this project
- Download all the pages that are in need of parsing by visiting the desired page and pressing Ctrl + S (CMD + S for Mac). it is highly recommended that you name the file as the submission's ID as shown below:
![download](https://imgur.com/U3XFyZZ.png)

- After that move all of the downloaded content to the ```samples``` you just created
- Download nodejs by visiting [here](https://nodejs.org/en/download)
- Run these commands at the root directory:
```
npm install
```
```
node index.js
```
- The output should be in an ```output``` folder and should look something like this:
[output](https://imgur.com/3j7xy71.png)
- The order of the output should be in the ```filePaths.txt``` file

## Contact
If you have occur any problems using this, you can contact me at:
phvuquang@gmail.com
