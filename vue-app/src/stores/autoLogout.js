const test = () => {
    console.log('test log');
}

export default function () {
    /* 定时器 间隔30秒检测是否长时间未操作页面 */
    // window.setInterval(checkTimeout, 30000);
    window.setInterval(test, 5000);
}