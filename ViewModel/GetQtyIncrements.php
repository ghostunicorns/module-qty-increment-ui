<?php
declare(strict_types=1);

namespace GhostUnicorns\QtyIncrementUi\ViewModel;

use Magento\Catalog\Model\Product;
use Magento\Framework\View\Element\Block\ArgumentInterface;

class GetQtyIncrements implements ArgumentInterface
{
    /**
     * @var \Magento\CatalogInventory\Api\StockRegistryInterface
     */
    private $stockRegistry;

    public function __construct(
        \Magento\CatalogInventory\Api\StockRegistryInterface $stockRegistry
    ) {
        $this->stockRegistry = $stockRegistry;
    }

    /**
     * Gets minimal sales quantity
     *
     * @param \Magento\Catalog\Model\Product $product
     * @return float
     */
    public function execute(Product $product): float
    {
        $stockItem = $this->stockRegistry->getStockItem($product->getId(), $product->getStore()->getWebsiteId());

        if ($stockItem->getEnableQtyIncrements()) {
            return (float) $stockItem->getQtyIncrements();
        }

        return 1.0;
    }
}
