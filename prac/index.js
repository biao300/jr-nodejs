






router.post('/tasks', (req, res) => {
    const {description} = req.body;
    const task = {description, id: id ++, done:false};
    tasks.push(task);
    return res.json(task);
});

router.get('/', (req, res) => {
    return res.send('hello world');
});

router.get('/tasks', (req, res) => {

    const { description } = req.query;

    console.log(description);

    if (description) {
        console.log("1");

        const filtedTasks = tasks.filter(i=>i.description.includes(description));
        return res.json(filtedTasks);

    } else {
        console.log("2");
        return res.json(tasks);
    }
});

router.get('/tasks/:id', (req, res) => {
    let i;

    const { id } = req.params;

    for (i = 0; i < tasks.length; i ++) {
        if (tasks[i].id == id) {
            return res.send(tasks[i]);
        }
    }
});

router.put('/tasks/:id', (req, res) => {
    
    const { id } = req.params;
    const {description, done} = req.body;


    const task = tasks.find((i) => i.id === Number(id));
    if (!task) {
        return res.sendStatus(404);
    }

    if (description) {
        task.description = description;
    }

    if (done !== undefined) {
        task.done = !!done; // convert string to boolean
    }

    return res.json(task);
});


router.delete('/tasks/:id', (req, res) => {
    
    const { id } = req.params;
    for (i = 0; i < tasks.length; i ++) {
        if (tasks[i].id === Number(id)) {
            tasks.splice(i,1);
        }
    }

    return res.json(tasks);
});

app.use(router);

app.listen(3000, () => {
    console.log('server listening on port 3000');
});




// jr post
// {id: number, author: string, content: string}