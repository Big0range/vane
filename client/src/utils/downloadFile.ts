export function downloadFile(blob: Blob, fileName: string) {
  // FileReader主要用于将文件内容读入内存
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  // onload当读取操作成功完成时调用
  reader.onload = function (e) {
    const a = document.createElement('a');
    // 获取文件名fileName
    a.download = fileName;
    a.href = e.target?.result as any;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    console.log('123');
  };
}

export function downloadImg(imgUrl: string, fileName: string) {
  return new Promise<void>((resolve, reject) => {
    const image = new Image();
    // 解决跨域 Canvas 污染问题
    image.setAttribute('crossOrigin', 'anonymous');
    image.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext('2d') as CanvasRenderingContext2D;
      context.drawImage(image, 0, 0, image.width, image.height);
      const url = canvas.toDataURL('image/png'); //得到图片的base64编码数据
      const a = document.createElement('a'); // 生成一个a元素
      const event = new MouseEvent('click'); // 创建一个单击事件
      a.download = fileName; // 设置图片名称
      a.href = url; // 将生成的URL设置为a.href属性
      a.dispatchEvent(event); // 触发a的单击事件
      resolve();
    };
    image.src = imgUrl;
  });
}
