# Description

This module adjust the GTM pushes to be compatible with the new GA4 ecommerce standards

# Install

`composer require ghost-unicorns/module-qty-increment-ui`

# How to use it

## Product listing:

`$productQtyIncrementInput = $block->getLayout()->getBlock('qty-increment-ui-product-listing');`

`<?= $productQtyIncrementInput->setData('product', $_product)->toHtml(); ?>`


## Cart:

`$productQtyIncrementInput = $block->getLayout()->getBlock('qty-increment-ui-cart');`

`<?= $productQtyIncrementInput->setData('cart_item', $_item)->set->toHtml(); ?>`


## Product page:

### Simple products

File: `vendor/magento/module-catalog/view/frontend/templates/product/view/addtocart.phtml`

```
<?php
/** @var $block \Magento\Catalog\Block\Product\View */

$productQtyIncrementInput = $block->getLayout()->getBlock('qty-increment-ui-product-simple');
?>
<?php $_product = $block->getProduct(); ?>
<?php $buttonTitle = __('Add to Cart'); ?>
<?php if ($_product->isSaleable()): ?>
    <div class="box-tocart">
        <div class="fieldset">
            <?php if ($block->shouldRenderQuantity()): ?>
                <div class="field qty">
                    <?= $productQtyIncrementInput->setData('product', $_product)->toHtml(); ?>
                </div>
            <?php endif; ?>
            <div class="actions">
                <button type="submit"
                        title="<?= /* @escapeNotVerified */ $buttonTitle ?>"
                        class="action primary tocart"
                        id="product-addtocart-button">
                    <span><?= /* @escapeNotVerified */ $buttonTitle ?></span>
                </button>
                <?= $block->getChildHtml('', true) ?>
            </div>
        </div>
    </div>
<?php endif; ?>
<script type="text/x-magento-init">
    {
        "#product_addtocart_form": {
            "Magento_Catalog/js/validate-product": {}
        }
    }
</script>
```


### Grouped products

Override/Extends the grouped template: `vendor/magento/module-grouped-product/view/frontend/templates/product/view/type/grouped.phtml`

Inject the block:
```
<?php $productQtyIncrementInput = $block->getChildBlock('qty-increment-ui-product-grouped'); ?>
```

Replace the class="control qty" content with:
```
<div class="control qty">
    <?= $productQtyIncrementInput->setData('product', $_item)->toHtml(); ?>
</div>
```


# Contribution

Yes, of course you can contribute sending a pull request to propose improvements and fixes.
