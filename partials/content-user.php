<?php

    if( !isset ( $user_meta ) ) $user_meta = get_user_fields();

    dump($user_meta);

    $name = $user_meta['first_name'] . ' ' . $user_meta['last_name'];

?>

<article class="row">
    <header>
        <h2 class="entry-title"><?php echo $name; ?></h2>
    </header>

    <?php if ( isset($user_meta[ABOUT_US]) && !empty(trim($user_meta[ABOUT_US])) ): ?>
        <div class="col-xs-12 col-md-6 p-3">
            <div class="card">
            <h3>Apie Mus</h3>
            <p><?php echo $user_meta[ABOUT_US]; ?></p>
        </div>
        </div>
    <?php endif; ?>

    <?php if ($user_meta[ACCEPT_VISITORS] == true): ?>
        <?php if ( isset($user_meta[VISITING_INFO]) && !empty(trim($user_meta[VISITING_INFO])) ): ?>
            <div class="col-xs-12 col-md-6 p-3">
                <div class="card">
                <h3>Aplankykit Mus</h3>
                <p><?php echo $user_meta[VISITING_INFO]; ?></p>
            </div>
            </div>
        <?php endif; ?>
        <?php if ( isset($user_meta[DIRECTIONS]) && !empty(trim($user_meta[DIRECTIONS])) ): ?>
            <div class="col-xs-12 col-md-6 p-3">
                <div class="card">
                <h3>Nuoroda</h3>
                <div>
                    <?php echo $user_meta[DIRECTIONS]; ?>
                </div>
            </div>
            </div>
        <?php endif; ?>
    <?php endif; ?>

    <?php if ( isset( $user_meta[OFFERING] ) && !empty( trim($user_meta[OFFERING]) ) ): ?>
        <div class="col-xs-12 col-md-6 p-3">
            <div class="card">
            <h3>Ką Siūlom</h3>
            <p><?php echo $user_meta[OFFERING]; ?></p>
        </div>
        </div>
    <?php endif; ?>
    
    <?php if ( isset( $user_meta[CONTACT_INFO] ) && !empty( trim($user_meta[CONTACT_INFO]) ) ): ?>
        <div class="col-xs-12 col-md-6 p-3">
            <div class="card">
            <h3>Kaip Mus Kontaktuoti</h3>
            <p><?php echo $user_meta[CONTACT_INFO]; ?></p>
        </div>
        </div>
    <?php endif; ?>
    

</article>