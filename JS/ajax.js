class Ajax {
    static request(method, url, data = null, headers = {}) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, true);

            // 设置请求头
            for (const [key, value] of Object.entries(headers)) {
                xhr.setRequestHeader(key, value);
            }

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        const response = xhr.responseText ? JSON.parse(xhr.responseText) : null;
                        resolve(response);
                    } catch (e) {
                        reject(new Error('Invalid JSON response'));
                    }
                } else {
                    reject(new Error(`Request failed with status ${xhr.status}`));
                }
            };

            xhr.onerror = () => {
                reject(new Error('Network error'));
            };

            xhr.send(data ? JSON.stringify(data) : null);
        });
    }

    static get(url, headers = {}) {
        return this.request('GET', url, null, headers);
    }

    static post(url, data, headers = {}) {
        return this.request('POST', url, data, {
            'Content-Type': 'application/json',
            ...headers
        });
    }

    static put(url, data, headers = {}) {
        return this.request('PUT', url, data, {
            'Content-Type': 'application/json',
            ...headers
        });
    }

    static delete(url, headers = {}) {
        return this.request('DELETE', url, null, headers);
    }
}
