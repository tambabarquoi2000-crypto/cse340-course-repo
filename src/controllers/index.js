const showHomePage = (req, res) =>
{
    const title = 'home';

    res.render('home', {title});
}

export { showHomePage };

