import { useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const StarRating = () => {
    const [value, setValue] = useState<number | null>(2);

    return (
        <div>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">Controlled</Typography>
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(_event, newValue) => {
                        setValue(newValue);
                    }}
                />
            </Box>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">Read only</Typography>
                <Rating name="read-only" value={value} readOnly />
            </Box>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">Disabled</Typography>
                <Rating name="disabled" value={value} disabled />
            </Box>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">Pristine</Typography>
                <Rating name="pristine" value={null} />
            </Box>
        </div>
    );
};

export default StarRating;
