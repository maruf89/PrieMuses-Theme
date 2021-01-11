<?php

	$is_primary = isset( $args['primary'] ) && $args['primary'];
?>

<div <?= $is_primary ? 'id="searchBox"' : '' ?> class="search-mod py-1 h-100">
	<form class="search-form form-inline search-form-bg">
		<div class="form-group h-100">
			<label class="sr-only"><?= __( 'Search PrieMuses', 'priemuses' ) ?></label>
			<input type="text"
				   name="input"
				   class="search-input form-control h-100"
				   placeholder="<?= __( 'Search' ) ?>" />
		</div>
	</form>
</div>

<?php
	/**
	 * Syntax for the search overlay
	 */
?>
<?php if ( $is_primary ): ?>

	<div id="searchOverlay" class="search-overlay">
        <div class="inner-wrap h-100 click-trap">
            <div class="bg-color"></div>
            <div class="content p-5">
                <form class="search-form row">
                    <div class="col-sm-12 col-centered">
                        <div class="form-group search-form-bg">
                            <label class="sr-only"><?= __( 'Search PrieMuses', 'priemuses' ) ?></label>
                            <input type="text"
                                name="search"
                                class="search-input form-control h-100"
                                placeholder="<?= __( 'Search' ) ?>" />
                        </div>
                    </div>
                    <div class="col-sm-12 col-centered mb-3">
                        <div class="container sep-box">
                            <legend><?= __( 'Search by…', 'priemuses') ?></legend>
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="form-check">
                                        <input type="radio"
                                            checked
                                            name="search_type"
                                            class="form-check-input"
                                            value="category"
                                            id="inputRadioCategory" />
                                        <label for="inputRadioCategory"
                                            class="form-check-label">
                                            <?= __( 'Category', 'community-directory' ) ?>
                                        </label>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-check">
                                        <input type="radio"
                                            name="search_type"
                                            class="form-check-input"
                                            value="entity"
                                            id="inputRadioEntity" />
                                        <label for="inputRadioEntity"
                                            class="form-check-label">
                                            <?= __( 'Entities', 'community-directory' ) ?>
                                        </label>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-check">
                                        <input type="radio"
                                            name="search_type"
                                            class="form-check-input"
                                            value="offer_need"
                                            id="inputRadioOfferNeed" />
                                        <label for="inputRadioOfferNeed"
                                            class="form-check-label">
                                            <?= __( 'Offers & Needs', 'community-directory' ) ?>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-12 col-centered mb-3">
                        <div class="container sep-box">
                            <button type="submit" class="btn-primary w-100">
                                <?= __( 'Go!', 'priemuses' ) ?>
                            </button>
                        </div>
                    </div>

                    <div class="col-sm-12 col-centered mb-3 search-results-box">
                        <div class="container sep-box">
                            <h2 class="search-res-title"><?= __( 'Search Results', 'priemuses' ); ?></h2>
                            <div class="search-res-wrap">
                                <div class="search-res-container" id="searchResultsContainer">
                                </div>
                                <div class="empty-search-res">
                                    <?= __( 'There were no results that matched your search…', 'priemuses' ); ?>
                                </div>
                                <div class="loading-search">
                                    <?= __( 'Loading…', 'priemuses' ); ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
	</div>

<?php endif; ?>