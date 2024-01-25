import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

/**
 * A custom circular progress component with a label.
 * @component
 * @example
 * return (
 *   <CustomCircularProgressWithLabel value={50} />
 * )
 */
function CustomCircularProgressWithLabel(props) {
  const { value } = props;

  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
          value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

CustomCircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

/**
 * A circular progress component with a label.
 * @component
 * @example
 * return (
 *   <CircularStatic progress={50} />
 * )
 */
export default function CircularStatic(props) {
  return <CustomCircularProgressWithLabel value={props.progress} />;
}
