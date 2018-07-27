/* eslint-disable */
require('script-loader!file-saver');
import JSZip from 'jszip'

/*
 *jsonData 图片地址，格式["",""]
 *
 *file_name_arr 图片名称，格式["",""]
 */
export function img_list_to_zip(jsonData, file_name_arr, zip_name) {
  const zip = new JSZip();
  const cache = {};
  const file_name = file_name_arr;
  const data = jsonData;
  const zipName = zip_name;
  zip.file(file_name, data, { binary: true }); // 逐个添加文件
  cache[file_name] = data;
  // 生成二进制流
  zip.generateAsync({type:"blob"}).then((blob) => {
    saveAs(blob, `${zip_name}.zip`)
  }, (err) => {
    alert('打包失败')
  })
}
