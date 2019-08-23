<?

	$data                = Timber::get_context();
	$data['post']        = Timber::get_post();

	// Get images from instagram by hashtag
	$curl = curl_init();
	curl_setopt_array($curl, [
	    CURLOPT_RETURNTRANSFER => 1,
	    CURLOPT_URL => 'https://www.instagram.com/luopet_brasil/?__a=1',
	]);

	$response = curl_exec($curl);
	curl_close($curl);

	$response = json_decode($response);
	$formatted = $response->graphql->user->edge_owner_to_timeline_media->edges;

	$images = array();

	foreach ($formatted as $key) {
		$images[] = $key->node->display_url;
	}

	$data['instagram'] = array_slice($images, 0, 5);

	Timber::render('front-page.twig', $data);
?>