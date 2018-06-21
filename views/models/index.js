<%- include('../partials/header') %>

<h1 class="text-center">All Models</h1>
<a href="/models/new">
	<button class="btn btn-primary">Add New Model</button>
</a>

<div>
	<div class="row">
		<% models.forEach((model) => { %>
			<a class="col-md-3 col-md-6" href="/models/<%= model._id %>">
				<img src="<%= model.image %>" alt="Model" class="img-thumbnail">		
			</a>
		<% }) %>
	</div>
</div>

<%- include('../partials/footer') %>