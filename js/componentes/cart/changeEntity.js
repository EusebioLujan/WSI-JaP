export function initializeQuantityUpdater({ productPrice, quantityInputId, subtotalFieldId }) {
    const quantityInput = document.getElementById(quantityInputId);
    const subtotalField = document.getElementById(subtotalFieldId);

    function updateSubtotal() {
        const quantity = parseInt(quantityInput.value, 10) || 0;
        const subtotal = productPrice * quantity;
        subtotalField.textContent = `$${subtotal.toFixed(2)}`;
    }
    quantityInput.addEventListener('input', updateSubtotal);
    updateSubtotal();
}
