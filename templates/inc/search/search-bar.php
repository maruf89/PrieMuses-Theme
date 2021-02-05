<?php $is_primary = isset( $args['primary'] ) && $args['primary']; ?>

<div <?= $is_primary ? 'id="searchBox"' : '' ?> class="search-mod py-1 h-100">
	<form class="search-form form-inline search-form-bg">
		<div class="form-group h-100 w-100">
			<label class="sr-only"><?= pm__( 'Search PrieMuses' ) ?></label>
			<input type="text"
				   name="input"
				   class="search-input form-control h-100 w-100"
				   placeholder="<?= __( 'Search' ) ?>"
                   data-ga-event="screenview"
                   data-ga-params='{"screen_name": "search"}'
                   />
		</div>
	</form>
</div>