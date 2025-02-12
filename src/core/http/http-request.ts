import http, { IncomingHttpHeaders, IncomingMessage, RequestOptions } from 'http';
import https from 'https';

// Tipos para os métodos HTTP suportados
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// Definição da classe HttpRequest
class HttpRequest {
  private baseUrl: string;
  private method: RequestMethod;
  private path: string;
  private headers: Record<string, string> = {};
  private body?: object;

  constructor(baseUrl: string, method: RequestMethod, path: string) {
    this.baseUrl = baseUrl;
    this.method = method;
    this.path = path;
  }

  // Definindo cabeçalhos para a requisição
  set(key: string, value: string): this {
    this.headers[key] = value;
    return this;
  }

  // Enviando um corpo (body) na requisição
  send(body: object): this {
    this.body = body;
    if (!this.headers['Content-Type']) {
      this.headers['Content-Type'] = 'application/json';
    }
    return this;
  }

  // Método para executar a requisição HTTP e retornar a resposta
  async execute(): Promise<Response> {
    const url = new URL(this.baseUrl + this.path);
    const isHttps = url.protocol === 'https:';
    const options: RequestOptions = {
      method: this.method,
      headers: this.headers,
      hostname: url.hostname,
      port: url.port || (isHttps ? 443 : 80),
      path: url.pathname + url.search,
    };

    const httpClient = isHttps ? https : http;

    return new Promise((resolve, reject) => {
      const req = httpClient.request(options, (res: IncomingMessage) => {
        let data = '';

        res.on('data', chunk => (data += chunk));
        res.on('end', () => {
          const response = new Response(res);
          response.body = data ? JSON.parse(data) : null;
          resolve(response);
        });
      });

      req.on('error', reject);

      if (this.body) {
        req.write(JSON.stringify(this.body));
      }

      req.end();
    });
  }
}

// Simulando a classe Response do Supertest
class Response extends IncomingMessage {
  status: number = 0;
  statusCode: number = 0;
  body: any = null;
  ok: boolean = false;
  error: boolean = false;
  headers: IncomingHttpHeaders = {};

  constructor(res: IncomingMessage) {
    super(res.socket);
    this.status = res.statusCode || 0;
    this.statusCode = res.statusCode || 0;
    this.headers = res.headers || {}; // Headers são do tipo IncomingHttpHeaders
    this.ok = this.status >= 200 && this.status < 300;
  }

  // Método para obter o valor de um cabeçalho como string
  get(header: string): string | undefined {
    const value = this.headers[header.toLowerCase()]; // Header names são case-insensitive
    if (Array.isArray(value)) {
      return value.join(', '); // Se o valor for um array, junta os valores em uma string
    }
    return value; // Retorna o valor ou undefined
  }

  isOk(): boolean {
    return this.ok;
  }

  isError(): boolean {
    return this.error;
  }
}

// Função de request com diferentes métodos HTTP
function request(baseUrl: string): {
  get: (path: string) => HttpRequest;
  post: (path: string) => HttpRequest;
  put: (path: string) => HttpRequest;
  delete: (path: string) => HttpRequest;
} {
  return {
    get: (path: string) => new HttpRequest(baseUrl, 'GET', path),
    post: (path: string) => new HttpRequest(baseUrl, 'POST', path),
    put: (path: string) => new HttpRequest(baseUrl, 'PUT', path),
    delete: (path: string) => new HttpRequest(baseUrl, 'DELETE', path),
  };
}

export { request, HttpRequest, Response };
