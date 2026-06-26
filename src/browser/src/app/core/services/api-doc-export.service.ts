import { Injectable } from '@angular/core';
import { ApiData, Collection, CollectionTypeEnum } from '../../services/storage/db/models/apiData';

/**
 * API文档导出服务
 * 支持导出为Word和PDF格式
 */
@Injectable({
  providedIn: 'root'
})
export class ApiDocExportService {
  constructor() {}

  /**
   * 导出为Word文档(HTML格式,.doc扩展名)
   */
  exportToWord(projectName: string, collections: Collection[]): void {
    const html = this.generateHtmlDocument(projectName, collections);
    this.downloadFile(`${projectName}_API文档.doc`, html, 'application/msword');
  }

  /**
   * 导出为PDF(通过打印对话框)
   */
  exportToPDF(projectName: string, collections: Collection[]): void {
    const html = this.generateHtmlDocument(projectName, collections, true);
    const printWindow = window.open('', '_blank');
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };
  }

  /**
   * 生成HTML文档
   */
  private generateHtmlDocument(projectName: string, collections: Collection[], isPrint: boolean = false): string {
    const styles = this.getStyles(isPrint);
    const content = this.generateContent(projectName, collections);
    
    return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName} - API文档</title>
  <style>${styles}</style>
</head>
<body>
  <div class="container">
    ${content}
  </div>
  ${isPrint ? '<script>window.onload = function() { window.print(); }</script>' : ''}
</body>
</html>`;
  }

  /**
   * 获取样式
   */
  private getStyles(isPrint: boolean): string {
    return `
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        font-family: "Microsoft YaHei", "Segoe UI", Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background: ${isPrint ? 'white' : '#f5f5f5'};
        padding: ${isPrint ? '0' : '20px'};
      }
      .container {
        max-width: 1000px;
        margin: 0 auto;
        background: white;
        padding: ${isPrint ? '20px' : '40px'};
        box-shadow: ${isPrint ? 'none' : '0 2px 8px rgba(0,0,0,0.1)'};
      }
      .header {
        text-align: center;
        margin-bottom: 40px;
        padding-bottom: 20px;
        border-bottom: 3px solid #FF6B35;
      }
      .header h1 {
        color: #FF6B35;
        font-size: 32px;
        margin-bottom: 10px;
      }
      .header .subtitle {
        color: #666;
        font-size: 14px;
      }
      .toc {
        background: #f9f9f9;
        padding: 20px;
        margin-bottom: 30px;
        border-radius: 8px;
      }
      .toc h2 {
        color: #333;
        font-size: 20px;
        margin-bottom: 15px;
      }
      .toc ul {
        list-style: none;
        padding-left: 0;
      }
      .toc li {
        margin: 8px 0;
      }
      .toc a {
        color: #FF6B35;
        text-decoration: none;
      }
      .toc a:hover {
        text-decoration: underline;
      }
      .group {
        margin-bottom: 40px;
        page-break-inside: avoid;
      }
      .group-title {
        font-size: 24px;
        color: #333;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 2px solid #eee;
      }
      .api-item {
        margin-bottom: 30px;
        padding: 20px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        page-break-inside: avoid;
      }
      .api-header {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
      }
      .method-badge {
        display: inline-block;
        padding: 4px 12px;
        border-radius: 4px;
        color: white;
        font-weight: bold;
        font-size: 12px;
        margin-right: 10px;
      }
      .method-GET { background: #61affe; }
      .method-POST { background: #49cc90; }
      .method-PUT { background: #fca130; }
      .method-DELETE { background: #f93e3e; }
      .method-PATCH { background: #50e3c2; }
      .api-name {
        font-size: 18px;
        font-weight: bold;
        color: #333;
      }
      .api-uri {
        font-family: 'Consolas', 'Monaco', monospace;
        background: #f5f5f5;
        padding: 8px 12px;
        border-radius: 4px;
        margin: 10px 0;
        font-size: 14px;
        color: #d63384;
      }
      .api-description {
        color: #666;
        margin: 10px 0;
        font-size: 14px;
      }
      .section {
        margin-top: 20px;
      }
      .section-title {
        font-size: 16px;
        font-weight: bold;
        color: #333;
        margin-bottom: 10px;
        padding-bottom: 5px;
        border-bottom: 1px solid #eee;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin: 10px 0;
        font-size: 14px;
      }
      th {
        background: #f9f9f9;
        padding: 10px;
        text-align: left;
        font-weight: bold;
        border: 1px solid #e0e0e0;
      }
      td {
        padding: 10px;
        border: 1px solid #e0e0e0;
      }
      .param-name {
        font-family: 'Consolas', 'Monaco', monospace;
        color: #d63384;
      }
      .param-required {
        color: #f93e3e;
        font-size: 12px;
      }
      .param-type {
        color: #61affe;
        font-size: 12px;
      }
      .response-example {
        background: #f5f5f5;
        padding: 15px;
        border-radius: 4px;
        font-family: 'Consolas', 'Monaco', monospace;
        font-size: 13px;
        overflow-x: auto;
        white-space: pre-wrap;
      }
      .footer {
        margin-top: 40px;
        padding-top: 20px;
        border-top: 1px solid #eee;
        text-align: center;
        color: #999;
        font-size: 12px;
      }
      @media print {
        body { background: white; padding: 0; }
        .container { box-shadow: none; padding: 20px; }
        .api-item { page-break-inside: avoid; }
      }
    `;
  }

  /**
   * 生成文档内容
   */
  private generateContent(projectName: string, collections: Collection[]): string {
    const { groups, apis } = this.flattenCollections(collections);
    
    let html = `
      <div class="header">
        <h1>🐕 ${projectName}</h1>
        <div class="subtitle">API接口文档 | 生成时间: ${new Date().toLocaleString('zh-CN')}</div>
      </div>
    `;

    // 目录
    if (groups.length > 0) {
      html += `<div class="toc"><h2>目录</h2><ul>`;
      groups.forEach((group, index) => {
        html += `<li><a href="#group-${index}">${group.name}</a></li>`;
      });
      html += `</ul></div>`;
    }

    // API分组
    groups.forEach((group, groupIndex) => {
      html += `<div class="group" id="group-${groupIndex}">`;
      html += `<h2 class="group-title">${group.name}</h2>`;
      
      group.apis.forEach(api => {
        html += this.renderApiItem(api);
      });
      
      html += `</div>`;
    });

    // 未分组的API
    if (apis.length > 0) {
      html += `<div class="group">`;
      html += `<h2 class="group-title">其他接口</h2>`;
      apis.forEach(api => {
        html += this.renderApiItem(api);
      });
      html += `</div>`;
    }

    // 页脚
    html += `
      <div class="footer">
        <p>本文档由 Postdog 自动生成 | Postdog - 开源API工具</p>
      </div>
    `;

    return html;
  }

  /**
   * 扁平化集合数据
   */
  private flattenCollections(collections: Collection[]): { groups: any[], apis: ApiData[] } {
    const groups: any[] = [];
    const apis: ApiData[] = [];

    const traverse = (items: Collection[]) => {
      items.forEach(item => {
        if (item.collectionType === CollectionTypeEnum.GROUP) {
          const group = item as any;
          const groupApis: ApiData[] = [];
          
          if (group.children) {
            group.children.forEach(child => {
              if (child.collectionType === CollectionTypeEnum.API_DATA) {
                groupApis.push(child as ApiData);
              } else {
                traverse([child]);
              }
            });
          }
          
          if (groupApis.length > 0) {
            groups.push({ name: group.name || '未命名分组', apis: groupApis });
          }
        } else if (item.collectionType === CollectionTypeEnum.API_DATA) {
          apis.push(item as ApiData);
        }
      });
    };

    traverse(collections);
    return { groups, apis };
  }

  /**
   * 渲染单个API项
   */
  private renderApiItem(api: ApiData): string {
    const method = this.getMethodName(api.protocol);
    let html = `<div class="api-item">`;
    
    // API头部
    html += `
      <div class="api-header">
        <span class="method-badge method-${method}">${method}</span>
        <span class="api-name">${api.name || '未命名接口'}</span>
      </div>
      <div class="api-uri">${api.uri || '/'}</div>
    `;

    // 描述
    if (api.introduction?.note) {
      html += `<div class="api-description">${api.introduction.note}</div>`;
    }

    // 请求参数
    if (api.requestParams) {
      const { headerParams, queryParams, restParams, bodyParams } = api.requestParams;
      
      if (headerParams && headerParams.length > 0) {
        html += this.renderParamsTable('请求头', headerParams);
      }
      
      if (queryParams && queryParams.length > 0) {
        html += this.renderParamsTable('查询参数', queryParams);
      }
      
      if (restParams && restParams.length > 0) {
        html += this.renderParamsTable('路径参数', restParams);
      }
      
      if (bodyParams && bodyParams.length > 0) {
        html += this.renderBodyParams('请求体', bodyParams);
      }
    }

    // 响应示例
    if (api.resultList && api.resultList.length > 0) {
      const result = api.resultList[0];
      if (result.content) {
        html += `
          <div class="section">
            <div class="section-title">响应示例</div>
            <div class="response-example">${this.escapeHtml(result.content)}</div>
          </div>
        `;
      }
    }

    html += `</div>`;
    return html;
  }

  /**
   * 渲染参数表格
   */
  private renderParamsTable(title: string, params: any[]): string {
    let html = `
      <div class="section">
        <div class="section-title">${title}</div>
        <table>
          <thead>
            <tr>
              <th>参数名</th>
              <th>类型</th>
              <th>必填</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
    `;

    params.forEach(param => {
      const isRequired = param.isRequired === 1;
      const dataType = param.dataTypeValue || param.dataType || 'string';
      html += `
        <tr>
          <td class="param-name">${param.name || '-'}</td>
          <td class="param-type">${dataType}</td>
          <td>${isRequired ? '<span class="param-required">是</span>' : '否'}</td>
          <td>${param.description || '-'}</td>
        </tr>
      `;
    });

    html += `</tbody></table></div>`;
    return html;
  }

  /**
   * 渲染请求体参数(支持嵌套)
   */
  private renderBodyParams(title: string, params: any[], level: number = 0): string {
    let html = `
      <div class="section">
        <div class="section-title">${title}</div>
        <table>
          <thead>
            <tr>
              <th>参数名</th>
              <th>类型</th>
              <th>必填</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
    `;

    const renderParam = (param: any, indent: number = 0) => {
      const prefix = ' '.repeat(indent);
      const isRequired = param.isRequired === 1;
      const dataType = param.dataTypeValue || param.dataType || 'string';
      
      html += `
        <tr>
          <td class="param-name">${prefix}${param.name || '-'}</td>
          <td class="param-type">${dataType}</td>
          <td>${isRequired ? '<span class="param-required">是</span>' : '否'}</td>
          <td>${param.description || '-'}</td>
        </tr>
      `;
      
      if (param.childList && param.childList.length > 0) {
        param.childList.forEach((child: any) => renderParam(child, indent + 1));
      }
    };

    params.forEach(param => renderParam(param));

    html += `</tbody></table></div>`;
    return html;
  }

  /**
   * 获取HTTP方法名
   */
  private getMethodName(protocol: number): string {
    const methods: { [key: number]: string } = {
      0: 'GET',
      1: 'POST',
      2: 'PUT',
      3: 'DELETE',
      4: 'PATCH'
    };
    return methods[protocol] || 'GET';
  }

  /**
   * HTML转义
   */
  private escapeHtml(text: string): string {
    const map: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  }

  /**
   * 下载文件
   */
  private downloadFile(filename: string, content: string, mimeType: string): void {
    const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
