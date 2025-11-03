export class BasePage {
    constructor() {
        this.url = '';
    }

    async open() {
        await browser.url(this.url);
    }

    async waitForPageLoad() {
        await browser.waitUntil(
            async () => {
                const state = await browser.execute(() => document.readyState);
                return state === 'complete';
            },
            {
                timeout: 10000,
                timeoutMsg: 'Page did not finish loading'
            }
        );
    }

    async getUrl() {
        return await browser.getUrl();
    }
}