<?

	$data                = Timber::get_context();
	$data['post']        = Timber::get_post();

	$data['categoria']   = 'tem';

	Timber::render('single.twig', $data);
?>