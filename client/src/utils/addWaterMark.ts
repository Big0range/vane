// 添加水印
export const addWaterMark = (
  str: string,
  opacity = '0.25',
  preventDel = true
): void => {
  let div = document.getElementById('waterMark');
  // 如果水印不存则创建dom元素
  if (div === null) {
    div = document.createElement('div');
    div.id = 'waterMark';
    document.body.appendChild(div);
  }
  let canvas = document.getElementById('waterMarkCanvas') as HTMLCanvasElement;
  // 如果canvas不存在则创建
  if (canvas === null) {
    canvas = document.createElement('canvas');
    canvas.id = 'waterMarkCanvas';
    document.body.appendChild(canvas);
  }
  document.body.appendChild(canvas);

  canvas.width = 165;
  canvas.height = 95;
  canvas.style.display = 'none';
  const cans = canvas.getContext('2d') as CanvasRenderingContext2D;
  // 清空画布
  cans.clearRect(0, 0, canvas.width, canvas.height);

  cans.rotate((-20 * Math.PI) / 180);
  cans.font = '16px Microsoft JhengHei';
  cans.fillStyle = 'rgba(17, 17, 17, 0.2)';
  cans.textAlign = 'left';
  cans.textBaseline = 'middle';
  cans.fillText(str, 30, 105, 200);

  div.style.backgroundImage = 'url(' + canvas.toDataURL('image/png') + ')';
  div.style.position = 'fixed';
  div.style.zIndex = '99999999999';
  div.style.top = '0';
  div.style.bottom = '0';
  div.style.left = '0';
  div.style.right = '0';
  div.style.opacity = opacity;
  // 防止水印被删除
  if (preventDel) {
    window.waterMarkFrame = requestAnimationFrame(
      addWaterMark.bind(null, str, opacity, preventDel)
    );
  }
};

export const removeWaterMark = (): void => {
  const div = document.getElementById('waterMark');
  const canvas = document.getElementById('waterMarkCanvas');
  if (div) {
    document.body.removeChild(div);
  }
  if (canvas) {
    document.body.removeChild(canvas);
  }
  if (window.waterMarkFrame) {
    cancelAnimationFrame(window.waterMarkFrame);
  }
};
