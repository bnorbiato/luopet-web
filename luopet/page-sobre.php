<?

	$data                = Timber::get_context();
	$data['post']        = Timber::get_post();

	Timber::render('page-sobre.twig', $data);
?>