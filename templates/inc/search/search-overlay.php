<div id="searchOverlay" class="search-overlay">
    <div class="inner-wrap click-trap gtag"
        data-ga-event="interaction"
        data-ga-params='{"screen_name": "search", "action": "close", "via": "background"}'>
        <span class="dashicons dashicons-no click-trap icon-close gtag"
            data-ga-event="interaction"
            data-ga-params='{"screen_name": "search", "action": "close", "via": "x-icon"}'></span>
        <div class="bg-color"></div>
        <div class="container-wrap">
            <form  class="content container">
                <div class="search-options" id="searchOptions">
                    <?php load_from_templates( 'inc/search/advanced-options' ); ?>
                </div>
                <div class="search-form row">
                    <div class="col-sm-12 col-centered mb-3">
                        <div class="form-group search-form-bg">
                            <label class="sr-only"><?= pm__( 'Search PrieMuses' ) ?></label>
                            <input type="text"
                                name="search"
                                class="search-input form-control h-100"
                                placeholder="<?= __( 'Search' ) ?>" />
                        </div>
                    </div>
                    <div class="col-sm-12 col-centered mb-3">
                        <div class="container sep-box">
                            <legend><?= pm__( 'Search by...') ?></legend>
                            <div class="row" id="searchBy">
                                <div class="col-sm-4">
                                    <div class="form-check">
                                        <input type="radio"
                                            name="search_type"
                                            class="form-check-input"
                                            value="entity"
                                            checked
                                            data-ga-event="interaction"
                                            data-ga-params='{"screen_name": "search", "action": "change primary filter", "value": "location"}'
                                            data-search-types='["location"]'
                                            id="inputRadioEntity" />
                                        <label for="inputRadioEntity"
                                            class="form-check-label">
                                            <?= _x( 'Entities', 'search', 'community-directory' ) ?>
                                        </label>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-check">
                                        <input type="radio"
                                            name="search_type"
                                            class="form-check-input"
                                            value="offer"
                                            data-search-types='["productService", "location"]'
                                            data-ga-event="interaction"
                                            data-ga-params='{"screen_name": "search", "action": "change primary filter", "value": "offer"}'
                                            id="inputRadioOffers" />
                                        <label for="inputRadioOffers"
                                            class="form-check-label">
                                            <?= _x( 'Offers', 'search', 'community-directory' ) ?>
                                        </label>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-check">
                                        <input type="radio"
                                            name="search_type"
                                            class="form-check-input"
                                            value="need"
                                            data-search-types='["productService", "location"]'
                                            data-ga-event="interaction"
                                            data-ga-params='{"screen_name": "search", "action": "change primary filter", "value": "need"}'
                                            id="inputRadioNeeds" />
                                        <label for="inputRadioNeeds"
                                            class="form-check-label">
                                            <?= _x( 'Needs', 'search', 'community-directory' ) ?>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div id="searchErrors" class="col-12 text-center error-row"></div>
                        </div>
                    </div>

                    <div class="col-sm-12 col-centered mb-3">
                        <div class="container sep-box">
                            <button type="submit" class="btn-primary w-100">
                                <?= pm__( 'Go!' ) ?>
                            </button>
                        </div>
                    </div>

                    <div class="col-sm-12 col-centered mb-3 search-results-box">
                        <div class="container sep-box">
                            <h2 class="search-res-title"><?= pm__( 'Search Results' ); ?></h2>
                            <div class="search-res-wrap">
                                <div class="search-res-container row" id="searchResultsContainer">
                                </div>
                                <div class="empty-search-res">
                                    <?= pm__( 'There were no results that matched your search…' ); ?>
                                </div>
                                <div class="loading-search">
                                    <?= pm__( 'Loading…' ); ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>