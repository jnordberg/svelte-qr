# svelte-qr

Crisp and fast SVG QR code generator for svelte.

```svelte
<script lang="ts">
    import QR from 'svelte-qr'
</script>

<!-- basic usage -->
<QR text="hello world" />

<!--
    error correction level
    L (7%), M (15%), Q (25%) or H (30%)
    defaults to L (recommended unless used for print)
-->
<QR text="hello world" level="H" />

<!--
    version (a.k.a. qr code size)
    1 to 40 where 40 is the largest
    defaults to -1 (autodetect, recommended)
-->
<QR text="unnecessarily large qr code" version={40} />
```
