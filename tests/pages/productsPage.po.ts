const productsPage = {
    menuButton: 'button[id="react-burger-menu-btn"]',
    sortSelect: 'select[data-test="product_sort_container"]',
    sortByNameAsc: 'az',
    sortByNameDsc: 'za',
    sortByPriceAsc: 'lohi',
    sortByPriceDsc: 'hilo',
    shoppingCart: 'a[class="shopping_cart_link"]',
    pageContent: 'div[class="inventory_list"]', 
    item:'div[class="inventory_item"]',
    itemName: 'div[class="inventory_item_name"]',
    linkOfItem: 'a',
    price: 'div[class = "inventory_item_price"]',
    addToCartButton: 'button[id^="add-to-cart"]',
    removeButton: 'button[id^ = "remove"]',
};
export default productsPage;