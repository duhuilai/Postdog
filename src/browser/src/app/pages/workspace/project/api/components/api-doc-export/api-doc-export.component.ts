import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiDocExportService } from 'pc/browser/src/app/core/services/api-doc-export.service';
import { Group, CollectionTypeEnum } from 'pc/browser/src/app/services/storage/db/models/index';
import { ApiData } from 'pc/browser/src/app/services/storage/db/models/apiData';
import { LocalService } from 'pc/browser/src/app/services/storage/local.service';
import { StoreService } from 'pc/browser/src/app/shared/store/state.service';

type Collection = (ApiData | (Group & { children?: Collection[] })) & {
  collectionType?: CollectionTypeEnum;
};

@Component({
  selector: 'eo-api-doc-export',
  template: `
    <div class="export-container">
      <div class="export-header">
        <h3>导出API文档</h3>
        <p class="subtitle">选择导出格式,生成专业的API接口文档</p>
      </div>
      
      <div class="export-options">
        <div class="format-card" [class.active]="selectedFormat === 'word'" (click)="selectedFormat = 'word'">
          <div class="format-icon">
            <svg viewBox="0 0 24 24" width="48" height="48">
              <path fill="#2b579a" d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>
              <path fill="white" d="M7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"/>
            </svg>
          </div>
          <div class="format-info">
            <div class="format-name">Word文档</div>
            <div class="format-desc">.doc格式,可在Microsoft Word中编辑</div>
          </div>
        </div>
        
        <div class="format-card" [class.active]="selectedFormat === 'pdf'" (click)="selectedFormat = 'pdf'">
          <div class="format-icon">
            <svg viewBox="0 0 24 24" width="48" height="48">
              <path fill="#dc2626" d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>
              <path fill="white" d="M7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"/>
            </svg>
          </div>
          <div class="format-info">
            <div class="format-name">PDF文档</div>
            <div class="format-desc">.pdf格式,适合打印和分享</div>
          </div>
        </div>
      </div>
      
      <div class="export-preview">
        <h4>文档预览</h4>
        <div class="preview-info">
          <div class="info-item">
            <span class="label">项目名称:</span>
            <span class="value">{{projectName}}</span>
          </div>
          <div class="info-item">
            <span class="label">接口数量:</span>
            <span class="value">{{apiCount}} 个</span>
          </div>
          <div class="info-item">
            <span class="label">导出格式:</span>
            <span class="value">{{selectedFormat === 'word' ? 'Word文档 (.doc)' : 'PDF文档 (.pdf)'}}</span>
          </div>
        </div>
      </div>
      
      <div class="export-actions">
        <button nz-button nzType="default" (click)="cancel()">取消</button>
        <button nz-button nzType="primary" (click)="export()" [nzLoading]="exporting">
          {{exporting ? '导出中...' : '开始导出'}}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .export-container {
      padding: 24px;
    }
    .export-header {
      margin-bottom: 24px;
    }
    .export-header h3 {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 8px;
      color: #333;
    }
    .subtitle {
      color: #666;
      font-size: 14px;
    }
    .export-options {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
    }
    .format-card {
      flex: 1;
      padding: 20px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .format-card:hover {
      border-color: #FF6B35;
      background: #fff9f5;
    }
    .format-card.active {
      border-color: #FF6B35;
      background: #fff9f5;
    }
    .format-icon {
      flex-shrink: 0;
    }
    .format-info {
      flex: 1;
    }
    .format-name {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 4px;
      color: #333;
    }
    .format-desc {
      font-size: 13px;
      color: #666;
    }
    .export-preview {
      background: #f9f9f9;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 24px;
    }
    .export-preview h4 {
      font-size: 16px;
      margin-bottom: 12px;
      color: #333;
    }
    .preview-info {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .info-item {
      display: flex;
      align-items: center;
      font-size: 14px;
    }
    .info-item .label {
      color: #666;
      width: 100px;
    }
    .info-item .value {
      color: #333;
      font-weight: 500;
    }
    .export-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }
  `]
})
export class ApiDocExportComponent implements OnInit {
  selectedFormat: 'word' | 'pdf' = 'word';
  exporting = false;
  projectName = 'API项目';
  apiCount = 0;
  collections: Collection[] = [];

  constructor(
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private exportService: ApiDocExportService,
    private localService: LocalService,
    private store: StoreService
  ) {}

  async ngOnInit() {
    await this.loadData();
  }

  private async loadData() {
    try {
      // 获取项目信息
      const currentProject = this.store.getCurrentProject;
      if (currentProject) {
        this.projectName = currentProject.name || 'API项目';
      }

      // 获取API集合 - 使用groupList获取所有分组和API
      const [groups] = await this.localService.api_groupList({ withItem: true });
      if (groups && groups.length > 0) {
        this.collections = this.convertGroupsToCollections(groups);
        this.apiCount = this.countApis(this.collections);
      }
    } catch (error) {
      console.error('加载数据失败:', error);
      this.message.error('加载数据失败');
    }
  }

  /**
   * 将Group结构转换为Collection结构
   */
  private convertGroupsToCollections(groups: Group[]): Collection[] {
    return groups.map(group => {
      const collection: any = {
        ...group,
        collectionType: group.type === 0 ? CollectionTypeEnum.Group : CollectionTypeEnum.API
      };
      
      if (group.children && group.children.length > 0) {
        collection.children = this.convertGroupsToCollections(group.children);
      }
      
      return collection;
    });
  }

  private countApis(collections: Collection[]): number {
    let count = 0;
    const traverse = (items: Collection[]) => {
      items.forEach(item => {
        if (item.collectionType === 1) { // API_DATA
          count++;
        } else if (item.collectionType === 0 && (item as any).children) { // GROUP
          traverse((item as any).children);
        }
      });
    };
    traverse(collections);
    return count;
  }

  cancel() {
    this.modalRef.close();
  }

  async export() {
    if (this.apiCount === 0) {
      this.message.warning('没有可导出的API接口');
      return;
    }

    this.exporting = true;
    try {
      if (this.selectedFormat === 'word') {
        this.exportService.exportToWord(this.projectName, this.collections);
        this.message.success('Word文档导出成功');
      } else {
        this.exportService.exportToPDF(this.projectName, this.collections);
        this.message.success('PDF文档已发送到打印队列');
      }
      this.modalRef.close(true);
    } catch (error) {
      console.error('导出失败:', error);
      this.message.error('导出失败,请重试');
    } finally {
      this.exporting = false;
    }
  }
}
