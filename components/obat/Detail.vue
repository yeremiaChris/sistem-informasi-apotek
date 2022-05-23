<template>
  <div
    class="mt-3 flex justify-between border border-gray-300 px-4 py-4 shadow-lg"
  >
    <div>
      <p>Nama obat</p>
      <p>-</p>
      <p>Satuan</p>
      <p>-</p>
      <p>Harga</p>
      <p>-</p>
    </div>
    <div>
      <input
        type="number"
        min="0"
        name="product"
        id="product"
        class="shadow-sm mt-1 border-2 px-2 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300"
        placeholder="Quantity..."
      />
      <p class="text-right mt-3">Total Rp. 0</p>
      <div class="flex justify-end mt-4">
        <FormsButton label="Tambah" />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
