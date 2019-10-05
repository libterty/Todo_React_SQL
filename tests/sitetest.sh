#~!/bin/bash

if curl http://serve:5000/site/ | grep site/; then
  echo "Site exists.\nSite test passes.\n"
  exit 0
else
  echo "Site does not exits.\Site test fails."
  exit 1
fi