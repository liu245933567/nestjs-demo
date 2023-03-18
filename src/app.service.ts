import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { catchError, firstValueFrom, of } from 'rxjs';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { ProductListReq, ResponseTpl } from './types';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService // private readonly logger: LoggerService,
  ) {}

  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    return 'Hello World!';
  }

  /**
   * 请求 apifox
   */
  async requestApifox<Content = object>(
    path: string,
    param?: object,
    config?: AxiosRequestConfig
  ) {
    const fullPath = `https://mock.apifox.cn/m1/1368041-0-default${path}`;

    const { data } = await firstValueFrom(
      this.httpService
        .post<ResponseTpl<Content>>(fullPath, param, {
          ...config,
          headers: {
            apifoxToken: 'N4X1ahcnI1CBQGu37Rc2C9qGVgbsIDRj'
          }
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(fullPath, error.message);
            return of({
              data: null as ResponseTpl<Content> | null,
              error
            });
          })
        )
    );

    return data;
  }

  /**
   * 产品列表获取
   * @returns
   */
  async productList(param: ProductListReq) {
    const data = await this.requestApifox('/back/v1/productList', param);

    return data;
  }

  /**
   * 同时获取产品列表
   */
  async syncGetList() {
    // const list = [...new Array(500)].map(() =>
    //   this.productList({
    //     prodName: 'test1'
    //   })
    // );

    const list = [
      this.productList({
        prodName: 'test1'
      }),

      // this.productList({
      //   prodName: '长时间未响应'
      // }),

      this.productList({
        prodName: 'test1'
      }),

      this.productList({
        prodName: 'test1'
      }),

      this.productList({
        prodName: 'test1'
      })
    ];

    const result = await Promise.all(list);

    return result;
  }
}
