export function initializeQuantityUpdaters() {
  const productElements = document.querySelectorAll(".product");

  productElements.forEach((productElement) => {
    const quantityInput = productElement.querySelector("[data-quantity]");
    const subtotalField = productElement.querySelector("[data-subtotal]");
    const productPrice = parseFloat(
      productElement.querySelector("[data-price]").textContent
    );

    function updateSubtotal() {
      const quantity = parseInt(quantityInput.value, 10) || 0;
      const subtotal = productPrice * quantity;
      subtotalField.textContent = `$${subtotal.toFixed(2)}`;
    }

    quantityInput.addEventListener("input", updateSubtotal);
    updateSubtotal();
  });
}
