import userService from '../services/user.js'

const getDetails = async (req, res) => {
    const details = await userService.getDetails(req.params.email, req.headers.authorization);

    if (details !== null) {
        res.json({
            email: details.email,
            firstName: details.firstName,
            lastName: details.lastName
          });
          
    } else {
        return res.status(404);
    }
};

export default {
    getDetails
};