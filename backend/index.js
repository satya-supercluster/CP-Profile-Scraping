const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const control = async(num)=>{
    const browser = await puppeteer.launch({
        headless:'new'
    });
    const page = await browser.newPage();
    await page.goto(`http://10.3.1.57/mws/home/view/smile/exam_result?studentUniqueId=${num}&RegSession=2023&RegSemester_type_id_code=2&effective_from=2021`)
    const pageData = await page.evaluate(()=>{
        return{
            html:document.documentElement.innerHTML
        }
    })
    // console.log(pageData)
    const $ = cheerio.load(pageData.html);
    const name=$('tr:nth-child(4)');
    const arr=name.text().match(/\b(\w+)\b/g);
    if(!arr){
        console.log(num+': not found');
    }
    else
    console.log(num+" : "+arr[2]+' '+arr[3]);
    await browser.close();
}
let k=2560;
for(let i=1;i<10;i++){
    control(k+i);
}

