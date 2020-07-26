<script lang="ts">
    /** The text to render as a QR code. */
    export let text: string
    /** Error correction level, L (7%), M (15%), Q (25%) or H (30%), defaults to L. */
    export let level: 'L' | 'M' | 'Q' | 'H' = 'L'
    /** Version 1-40 (a.k.a. size), defaults to -1 (autodetect). */
    export let version: number = -1

    import QRCode from './QRCode'
    import ErrorCorrectLevel from './ErrorCorrectLevel'

    interface Rect {
        x: number
        y: number
        width: number
        height: number
    }

    let size: number
    let rects: Rect[] = []
    $: {
        let qr = new QRCode(version, ErrorCorrectLevel[level])
        qr.addData(text)
        qr.make()
        const rows = qr.modules
        size = rows.length
        for (const [y, row] of rows.entries()) {
            let rect: Rect | undefined
            for (const [x, on] of row.entries()) {
                if (on) {
                    if (!rect) rect = {x, y, width: 0, height: 1}
                    rect.width++
                } else {
                    if (rect && rect.width > 0) {
                        rects.push(rect)
                    }
                    rect = undefined
                }
            }
            if (rect && rect.width > 0) {
                rects.push(rect)
            }
        }
    }
</script>

<style>
    .qr {
        display: block;
        /* render with crisp edges to remove hairline gaps between rects */
        shape-rendering: crispEdges;
        /* promote to gpu layer so that crisp edges are preserved even if a transform is applied to a parent */
        transform: translateZ(0);
    }
    .qr rect {
        fill: var(--qr-color, 'currentColor');
    }
</style>

<svg class="qr" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}">
    {#each rects as rect}
        <rect {...rect} />
    {/each}
</svg>
