<?
	$data 		   = Timber::get_context();
	$data['posts'] = Timber::get_posts();

	$post = Timber::get_post();
	$data['categoria'] = $post->terms( 'categorias-cat' );

	if ($data['categoria'][0]->slug == 'baked' || $data['categoria'][0]->slug == 'special-care') {
		Timber::render('archive-produtos-baked.twig', $data);
	} else {
		Timber::render('archive-produtos.twig', $data);
	}