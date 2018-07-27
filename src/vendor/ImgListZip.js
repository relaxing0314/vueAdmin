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
  const file_name = file_name_arr;
  const data = jsonData;
  const zipName = zip_name;

  file_name.map((v,j) => {
    zip.file(v,data[j],{base64:true});
  })
  // 生成二进制流
  zip.generateAsync({type:"blob"}).then((blob) => {
    saveAs(blob, `${zipName}.zip`)
  }, (err) => {
    alert('打包失败')
  })
}
