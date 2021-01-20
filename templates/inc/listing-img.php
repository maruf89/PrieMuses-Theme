<?php

$photo = $args[ 'photo' ] ?? false;

if ( $photo ):
    $non_retina = $photo[ 'non_retina' ] ?? $photo[ 'sizes' ][ 'cd_thumb' ];
    $retina = $photo[ 'retina' ] ?? $photo[ 'sizes' ][ 'cd_thumb@2x' ];
    ?>
        <div class="img-container non-retina" style="background: url(<?= $non_retina ?>) no-repeat center;">
            <img class="d-none d-sm-none" src="<?= $non_retina ?>" />
        </div>
        <div class="img-container retina" style="background: url(<?= $retina ?>) no-repeat center;">
            <img class="d-none d-sm-none" src="<?= $retina ?>" />
        </div>
    <?php
endif;