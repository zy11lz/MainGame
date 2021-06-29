module Pro
{
    export class Polyfill
    {
       static setup(): void
        {
            SystemUtils.validateCallLater();
            SpritePolyfill.setup();
        }
    }
}

